cd animals
setlocal enabledelayedexpansion
set j=0
for %%i in (*.png) do ( 
   set /A j+=1
   ren "%%i" "a!j!.png"
)
set j=0
for %%i in (*.png) do ( 
   set /A j+=1
   ren "%%i" "!j!.png"
)