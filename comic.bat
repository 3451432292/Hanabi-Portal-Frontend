echo [ >> comic.json
for /R %1 %%I In (*.*) do echo "%%~nI.webp", >> comic.json
echo ] >> comic.json