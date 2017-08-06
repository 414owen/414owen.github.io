#!/usr/bin/env bash

for i in images/*.svg; do 
	out="images/min/$(printf "$(basename $i)" | sed "s/.svg//g" | sed "s/ /-/g" | tr '[:upper:]' '[:lower:]' | rev).svg"
	echo "Cleaning \"$i\" -> \"$out\""
	svgcleaner "$i" "$out"
done
