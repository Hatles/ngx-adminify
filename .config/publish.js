const execSync = require('child_process').execSync,
    packages = [
        'router',
        'core',
        'entity',
        // 'material',
    ];

packages.map(package => {
    const packagePath = `${__dirname}/../dist/@ngx-adminify/${package}`;

    execSync(`cd ${packagePath} && npm publish --access public`);
});
