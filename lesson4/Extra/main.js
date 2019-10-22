function hey (a) {
    if (typeof a !== 'string') console.log('Это не строка');
    console.log(a);
    a = a.trim();
    console.log(a);
    if (a.length > 30) console.log(a.slice(0, 30) + '...');
}

hey ('         Эта строка слишком длинна для тебя         ');