# Settings

setopt HIST_IGNORE_DUPS

export CLICOLOR=1
export LSCOLORS=ExGxFxdaCxDaDahbadacec
export LS_COLORS='di=01;34:ln=01;36:so=01;35:pi=33;40:ex=01;32:bd=01;33;40:cd=01;33;40:su=37;41:sg=30;43:tw=30;42:ow=34;42'
export PROMPT='%B%F{blue}%1~%f%b %B%#%b '

# Homebrew

eval "$(/opt/homebrew/bin/brew shellenv)"

# Completion

autoload -Uz compinit bashcompinit
compinit
bashcompinit
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
zstyle ':completion:*' menu select

# Environments

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
