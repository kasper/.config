# Colours
reset=$(tput sgr0)
bold=$(tput bold)

# Settings
export PS1='\[$bold\]\W \$ \[$reset\]'
export HISTCONTROL=ignoreboth
export CLICOLOR=1
export LSCOLORS=ExGxFxdaCxDaDahbadacec

# Environments

## Java
export JAVA_HOME=$(/usr/libexec/java_home)

## rbenv
eval "$(rbenv init -)"

# Aliases

alias ll='ls -al'
alias serve='python -m SimpleHTTPServer'
alias tar-create='tar cvzf'
alias tar-extract='tar xvzf'
