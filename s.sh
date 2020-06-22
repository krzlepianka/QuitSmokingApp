#!/bin/bashecho $STYrepeat() {while :; do $@ && return; done} repeat npm run serve
