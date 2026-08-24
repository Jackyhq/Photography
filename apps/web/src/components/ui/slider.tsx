import { clsxm } from '@afilmory/utils'
import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SliderProps {
  value: number | 'auto'
  onChange: (value: number | 'auto') => void
  onValueCommit?: (value: number | 'auto') => void
  min: number
  max: number
  step?: number
  autoLabel?: string
  ariaLabel?: string
  className?: string
  disabled?: boolean
}

export const Slider = ({
  value,
  onChange,
  onValueCommit,
  min,
  max,
  step = 1,
  autoLabel,
  ariaLabel,
  className,
  disabled = false,
}: SliderProps) => {
  const { t } = useTranslation()
  const finalAutoLabel = autoLabel || t('slider.auto')
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const activePointerIdRef = useRef<number | null>(null)
  const latestValueRef = useRef(value)
  latestValueRef.current = value

  // 将值转换为位置百分比
  const getPositionFromValue = useCallback(
    (val: number | 'auto') => {
      if (val === 'auto') return 5 // 自动档位置稍微偏右一点
      if (max === min) return 100
      const clampedValue = Math.min(max, Math.max(min, val))
      // 数值档从 15% 开始到 100%
      return 15 + ((clampedValue - min) / (max - min)) * 85
    },
    [min, max],
  )

  // 将位置百分比转换为值
  const getValueFromPosition = useCallback(
    (position: number) => {
      if (position <= 12) return 'auto' // 左侧 12% 区域为自动档
      if (max === min) return min
      const normalizedPosition = (position - 15) / 85 // 从 15% 开始的 85% 区域为数值
      const rawValue = min + Math.max(0, Math.min(1, normalizedPosition)) * (max - min)
      const steppedValue = min + Math.round((rawValue - min) / step) * step
      return Math.min(max, Math.max(min, steppedValue))
    },
    [min, max, step],
  )

  const updateValueFromPointer = useCallback(
    (clientX: number) => {
      const slider = sliderRef.current
      if (!slider) return

      const rect = slider.getBoundingClientRect()
      if (rect.width <= 0) return

      const position = ((clientX - rect.left) / rect.width) * 100
      const clampedPosition = Math.max(0, Math.min(100, position))
      const newValue = getValueFromPosition(clampedPosition)

      if (newValue !== latestValueRef.current) {
        latestValueRef.current = newValue
        onChange(newValue)
      }
    },
    [getValueFromPosition, onChange],
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return

      event.preventDefault()
      activePointerIdRef.current = event.pointerId
      event.currentTarget.setPointerCapture?.(event.pointerId)
      setIsDragging(true)
      updateValueFromPointer(event.clientX)
    },
    [disabled, updateValueFromPointer],
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (activePointerIdRef.current !== event.pointerId) return
      updateValueFromPointer(event.clientX)
    },
    [updateValueFromPointer],
  )

  const finishPointerInteraction = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, updateFromPointer: boolean) => {
      if (activePointerIdRef.current !== event.pointerId) return
      if (updateFromPointer) updateValueFromPointer(event.clientX)

      activePointerIdRef.current = null
      setIsDragging(false)
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
      onValueCommit?.(latestValueRef.current)
    },
    [onValueCommit, updateValueFromPointer],
  )

  const commitKeyboardValue = useCallback(
    (nextValue: number | 'auto') => {
      latestValueRef.current = nextValue
      onChange(nextValue)
      onValueCommit?.(nextValue)
    },
    [onChange, onValueCommit],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      const currentValue = latestValueRef.current
      let nextValue: number | 'auto' | undefined

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp': {
          nextValue = currentValue === 'auto' ? min : Math.min(max, currentValue + step)
          break
        }
        case 'ArrowLeft':
        case 'ArrowDown': {
          nextValue = currentValue === 'auto' || currentValue <= min ? 'auto' : Math.max(min, currentValue - step)
          break
        }
        case 'Home': {
          nextValue = 'auto'
          break
        }
        case 'End': {
          nextValue = max
          break
        }
      }

      if (nextValue === undefined) return
      event.preventDefault()
      if (nextValue !== currentValue) commitKeyboardValue(nextValue)
    },
    [commitKeyboardValue, disabled, max, min, step],
  )

  const position = getPositionFromValue(value)

  return (
    <div className={clsxm('w-full', className)}>
      {/* 标签 */}
      <div className="text-text-secondary mb-2 flex justify-between text-xs">
        <span>{finalAutoLabel}</span>
        <span>{max}</span>
      </div>

      {/* 滑块轨道 */}
      <div
        ref={sliderRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        aria-orientation="horizontal"
        aria-valuemin={min - step}
        aria-valuemax={max}
        aria-valuenow={value === 'auto' ? min - step : Math.min(max, Math.max(min, value))}
        aria-valuetext={value === 'auto' ? finalAutoLabel : String(value)}
        className={clsxm(
          'relative h-6 touch-none cursor-pointer select-none rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishPointerInteraction(event, true)}
        onPointerCancel={(event) => finishPointerInteraction(event, false)}
        onKeyDown={handleKeyDown}
      >
        {/* 背景轨道 */}
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-neutral-200 dark:bg-neutral-700">
          {/* 自动档区域指示 */}
          <div className="absolute top-0 left-0 h-full w-[12%] rounded-l-full bg-green-100 dark:bg-green-900/50" />

          {/* 激活区域 */}
          <div
            className={clsxm(
              'absolute top-0 h-full rounded-full transition-all duration-150 max-w-full',
              value === 'auto' ? 'bg-green-500' : 'bg-accent',
            )}
            style={{
              width: `${Math.max(position, 5)}%`,
              borderRadius: value === 'auto' ? '9999px 0 0 9999px' : '9999px',
            }}
          />
        </div>

        {/* 滑块把手 */}
        <div
          className={clsxm(
            'absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg transition-all duration-150',
            isDragging ? 'scale-110' : 'hover:scale-105',
            value === 'auto' ? 'bg-green-500' : 'bg-accent',
            disabled && 'cursor-not-allowed',
          )}
          style={{
            left: `${position}%`,
          }}
        />

        {/* 数值刻度 */}
        <div className="text-text-secondary absolute top-full mt-1 flex w-full text-xs">
          <div className="w-[15%] text-left">
            <span className={clsxm('transition-colors', value === 'auto' && 'font-medium text-green-500')}>
              {finalAutoLabel}
            </span>
          </div>
          <div className="flex w-[85%] justify-between">
            {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
              <span key={num} className={clsxm('transition-colors', value === num && 'font-medium text-accent')}>
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 当前值显示 */}
      <div className="mt-8 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
        {value === 'auto' ? finalAutoLabel : t('slider.columns', { count: value } as any)}
      </div>
    </div>
  )
}
