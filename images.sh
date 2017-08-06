#!/usr/bin/env bash

for i in images/*.*; do 
	ending=$(printf "${i}" | sed "s/^.*\.//g")
	base=$(printf "$(basename "${i}")" | sed "s/\.${ending}$//g")
	echo "Base: \"${base}\", Ending: \"${ending}\""
	outname="$(printf "${base}" | sed "s/ /-/g" | tr '[:upper:]' '[:lower:]' | rev).${ending}"
	if [ "${ending}" == "svg" ]; then
		out="images/min/${outname}"
		if [ ! -f "${out}" ]; then
			echo "Cleaning \"${base}.${ending}\" -> \"${outname}\""
			svgcleaner "${i}" "${out}"
		fi
	else
		out="images/bitmap/${outname}"
		echo "Symlinking ${base}.${ending} -> ${outname}"
		ln -s "${i}" "${out}"
	fi
done
