const fs = require("fs"),
    path = require("path"),
    packages = [
        'router',
        'core',
        'entity',
    ];

// update `FORMLY-VERSION` in package.json for all sub-packages
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
packages.map(package => {
    const packagePath = `dist/@ngx-adminify/${package}`;

    fs.copyFileSync('README.md', path.join(packagePath, 'README.md'));
    fs.copyFileSync('LICENSE', path.join(packagePath, 'LICENSE'));

    package = fs.readFileSync(`${packagePath}/package.json`, 'utf8');
    fs.writeFileSync(`${packagePath}/package.json`, package.replace(/0.0.0-ADMINIFY-VERSION/g, version));
});
