pyside2-uic manager_form.ui > ..\modules\ui\manager_form.py
pyside2-uic node_details_form.ui > ..\modules\ui\node_details_form.py
pyside2-uic slot_details_form.ui > ..\modules\ui\slot_details_form.py

@powershell -Command "get-content -path ..\modules\ui\manager_form.py | foreach-object {$_ -replace 'from PySide2','from Qt'} | Set-Content ..\modules\ui\manager_form.py.copy"
@powershell -Command "Move-Item -Path ..\modules\ui\manager_form.py.copy -Destination ..\modules\ui\manager_form.py -force" 

@powershell -Command "get-content -path ..\modules\ui\node_details_form.py | foreach-object {$_ -replace 'from PySide2','from Qt'} | Set-Content ..\modules\ui\node_details_form.py.copy"
@powershell -Command "Move-Item -Path ..\modules\ui\node_details_form.py.copy -Destination ..\modules\ui\node_details_form.py -force" 

@powershell -Command "get-content -path ..\modules\ui\slot_details_form.py | foreach-object {$_ -replace 'from PySide2','from Qt'} | Set-Content ..\modules\ui\slot_details_form.py.copy"
@powershell -Command "Move-Item -Path ..\modules\ui\slot_details_form.py.copy -Destination ..\modules\ui\slot_details_form.py -force" 