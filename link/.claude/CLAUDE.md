# Personal preferences

## General

- Use British English in prose and code, but match existing style and keep APIs as they are (e.g. `color` in CSS).
- Ask before installing anything on my computer or adding dependencies to a project.
- For small, clear tasks in version-controlled code, edit straight away. For larger changes, plan first and wait for my approval. Always ask before editing anything not under version control.
- Ask before deleting or overwriting files or directories, or discarding uncommitted changes (e.g. `git restore`, `git reset --hard`, `git clean`), unless I asked for it or you created them in the current task.
- If the project has a testing setup, add tests with code changes.
- Before calling something done, run the project’s checks (tests, linter, type checker) locally where possible. If they can’t run, say so.
- Leave things better than you found them: suggest fixes for nearby issues, but don’t make them unasked.
- In replies, give the result and the reasoning behind it.

## Environment

- macOS with zsh. Node via nvm, Ruby via rbenv, everything else via Homebrew (`~/.Brewfile`).
- All environment settings live in `~/.config`; add new dotfiles to its `link` directory.

## Code style

- Without formatter config, prefer 2-space indentation, single quotes and trailing commas, unless the language’s conventions differ (e.g. 4 spaces in Python).
- Comment sparingly: only to explain why, never what.

## Git

- Work on the checked-out branch, or the one I name.
- Only commit or push when asked.
- Only sign commits when explicitly asked. Never bypass hooks.
- Write short, imperative commit messages, e.g. ‘Add Claude Code to .Brewfile’.
