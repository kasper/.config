# Colours
reset=$(tput sgr0)
bold=$(tput bold)
blue=$(tput setaf 4)

# Settings
export PS1='\[$bold\]\[$blue\]\W\[$reset\]\[$bold\] \$ \[$reset\]'
export HISTCONTROL=ignoreboth
export CLICOLOR=1
export LSCOLORS=ExGxFxdaCxDaDahbadacec

# Environments

## Brew
[ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion

## GPG
export GPG_TTY=$(tty)

## Java
export JAVA_HOME=$(/usr/libexec/java_home)

## rbenv
eval "$(rbenv init -)"

# Aliases

alias ll='ls -al'
alias serve='python -m SimpleHTTPServer'
alias tar-create='tar cvzf'
alias tar-extract='tar xvzf'
