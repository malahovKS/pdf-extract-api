#!/usr/bin/env bash

#Check dependencies
#Check Node
if ! type "node" > /dev/null 2>&1; then
    printf >&2 "node not found! Install? (y/n):";
    read -n1 REPLY
    case $REPLY in
      y|Y) printf "\nInstalling Node.js v6.x . . .\n";
           # Using Ubuntu
            curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
            sudo apt-get install -y nodejs
            node -v
            npm install -g n
            n lts
            npm install npm@latest -g
            npm -v ;;
      n|N) printf "\nAbort\n";
           exit 1 ;;
      *) exit 1 ;;
    esac
fi

#Check pdftotext
if ! type "pdftotext" > /dev/null 2>&1; then
    printf >&2 "pdftotext not found! Install? (y/n):";
    read -n1 REPLY
    case $REPLY in
      y|Y) printf "\nInstalling poppler-utils . . .\n";
           sudo apt-get update
           sudo apt-get upgrade
           sudo apt-get install poppler-utils ;;
      n|N) printf "\nAbort\n";
           exit 1 ;;
      *) exit 1 ;;
    esac
fi

#Install node_modules
printf "\nInstall node_modules . . .\n"
npm install