# Gymkhana-Elections-Dapp

Repo for the final project for Web3.0

I have Created the D-app in two parts

**THE FRONT END**

This consists of 3 files index.html , index.css, index.js

It's a simple one page application in which a voter can give preferences after giving their id and password.

The working ids are ['Zehaan22','Aditya22','Ritesh22','Animesh22'].

The password for all of them is pass123.

You can choose the preference in any order.

**THE BACK END**

This consists of one file main_contract.sol

This is a basic implementation of the contract, in whihc a registered voter can vote for 3 prefs once. First pref gets +5 , second +3 and third +1

The winningCandidate function returns the index of the winning candidate
