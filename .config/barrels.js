const execSync = require('child_process').execSync,
    packages = [
        'router',
        'core',
        'entity',
        // 'material',
    ];

packages.map(package => {
    const packagePath = `${__dirname}/../src/${package}`;

    execSync(`cd ${packagePath} && barrelsby --delete -c barrelsbyconfig.json`);
});
