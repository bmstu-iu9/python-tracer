# python-tracer
Интерактивный тренажёр по Питону

Тренажёр предназначен для обучения чтению программ на Python 3 студентов
факультета «Лингвистика» по курсу «Основы программирования».

# Как обновлять пакеты
Время от времени GitHub сообщает об уязвимостях в установленных пакетах.
Чтобы их исправить, нужно выполнить следующие команды:

    npm i -g npm-check-updates
    ncu -u
    npm install
    npm audit
    npm audit fix

Если `ncu` вылетает с исключением, нужно переустановить `node`, она быстро
протухает.
