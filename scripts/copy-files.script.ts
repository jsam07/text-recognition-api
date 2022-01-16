import * as shell from 'shelljs';

shell.cp('-R', 'src/public/', 'dist/src/');
shell.cp('-R', 'src/uploads/', 'dist/src/');
