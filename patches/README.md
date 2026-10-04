# Temporary dependency security patches

`braces@3.0.3.patch` backports the implementation changes from
[micromatch/braces#72](https://github.com/micromatch/braces/pull/72), commit
`28d440b5dd449dbf1fe6f3506cf94ecca4d02660`, for
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

The patch limits combined brace/parenthesis nesting to 100, guards the public AST
processing paths, and rejects cyclic parent links during expansion. Ordinary
patterns retain their existing expansion and escaping behavior. The patch is
applied by pnpm during installation and tested in
`scripts/dependency-security.test.ts` through fast-glob's dependency chain.

The upstream package has no published fixed version at the time of this change.
Version-based audit tools still report `braces@3.0.3`; this advisory is deliberately
not ignored or dismissed. Replace the patch with an upstream fixed release once
available, and keep the regression tests when upgrading.
