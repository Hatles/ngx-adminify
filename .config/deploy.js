const ghpages = require('gh-pages');
const { copyFileSync } = require('fs');
const { copySync } = require('fs-extra');
const { join } = require('path');
const { execSync } = require('child_process');
const basePath = join(process.cwd(), 'dist/app');
const branch = process.env.TRAVIS_BRANCH || execSync(`git branch | sed -n '/\* /s///p'`).toString().trim();
const isStableVersion = branch === 'v5';
// build demo
execSync(
    `rm -rf dist/app && ng build --prod --deploy-url=/ngx-adminify/${branch}/ --base-href=/ngx-adminify/${isStableVersion ? '': branch} --output-path=dist/app/${branch}`,
    {stdio: 'inherit'}
);

copyFileSync(join(basePath, branch, 'index.html'), join(basePath, branch, '404.html'));
if (isStableVersion) {
    copySync(join(basePath, branch, 'assets'), join(basePath, 'assets'));
    copyFileSync(join(basePath, branch, 'favicon.ico'), join(basePath, 'favicon.ico'));
    ['404', 'index'].forEach(page => copyFileSync(join(basePath, branch, 'index.html'), join(basePath, `${page}.html`)));
}

ghpages.publish(
    basePath,
    {
        only: branch,
        repo: 'https://' + process.env.GH_TOKEN + '@github.com/Hatles/ngx-adminify.git',
    }
);
