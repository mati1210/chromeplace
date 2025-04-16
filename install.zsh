#!/usr/bin/zsh
SCRIPTDIR=${0:h:A}

kpackagetool6 --type=KWin/Script -r chromeplace
kpackagetool6 --type=KWin/Script -i $SCRIPTDIR
kwriteconfig6 --file kwinrc --group Plugins --key chromeplaceEnabled true

qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript chromeplace
qdbus org.kde.KWin /KWin reconfigure