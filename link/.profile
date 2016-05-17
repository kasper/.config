# Colours
reset=$(tput sgr0)
bold=$(tput bold)

# Settings
export PS1='\[$bold\]\W \$ \[$reset\]'
export HISTCONTROL=ignoreboth
export CLICOLOR=1
export LSCOLORS=ExGxFxdaCxDaDahbadacec

# Aliases

alias ll='ls -al'
alias serve='python -m SimpleHTTPServer'

## Apps
alias coda='open -a "Coda 2"'

# Java
export JAVA_HOME=$(/usr/libexec/java_home)

# rbenv
eval "$(rbenv init -)"

# Go
export GOPATH=$HOME/Ohjelmointi/Go/
