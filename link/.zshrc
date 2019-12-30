# Settings

setopt HIST_IGNORE_DUPS

export CLICOLOR=1
export LSCOLORS=ExGxFxdaCxDaDahbadacec
export PROMPT='%B%F{blue}%1~%f%b %B%#%b '

# Environments

## GPG
export GPG_TTY=$(tty)

## NVM
export NVM_DIR="$HOME/.nvm"
[ -f /usr/local/opt/nvm/nvm.sh ] && . /usr/local/opt/nvm/nvm.sh
[ -f /usr/local/opt/nvm/etc/bash_completion.d/nvm ] && . /usr/local/opt/nvm/etc/bash_completion.d/nvm

## rbenv
eval "$(rbenv init -)"

# Aliases

alias ll='ls -al'
