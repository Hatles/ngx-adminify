const execSync = require('child_process').execSync,
    packages = [
        'router',
        'core',
        // 'entity',
        // 'material',
    ];

packages.map(package => {
    const packagePath = `${__dirname}/../src/${package}`;
    console.log(packagePath);
    execSync(`cd ${packagePath} && barrelsby -c barrelsbyconfig.json`);
});