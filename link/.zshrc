# Settings

setopt HIST_IGNORE_DUPS

export CLICOLOR=1
export LSCOLORS=ExGxFxdaCxDaDahbadacec
export PROMPT='%B%F{blue}%1~%f%b %B%#%b '

# Environments

## Homebrew
eval "$(/opt/homebrew/bin/brew shellenv)"

## GPG
export GPG_TTY=$(tty)

## NVM
export NVM_DIR="$HOME/.nvm"
[ -f /opt/homebrew/opt/nvm/nvm.sh ] && . /opt/homebrew/opt/nvm/nvm.sh
[ -f /opt/homebrew/opt/nvm/etc/bash_completion.d/nvm ] && . /opt/homebrew/opt/nvm/etc/bash_completion.d/nvm

## rbenv
eval "$(rbenv init -)"

# Aliases

alias ll='ls -al'
