#!/usr/bin/env

for i in images/*.svg; do 
	svgcleaner $i "images/min/$(printf "$(basename $i)" | sed "s/.svg//g" | sed "s/ /-/g" | tr '[:upper:]' '[:lower:]' | rev).svg"
done
