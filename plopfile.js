module.exports = function (
	/** @type {import('plop').NodePlopAPI} */
	plop
	) {

	// declare a new generator
  plop.setGenerator('component', {
    description: 'Create a React component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Component name?',
    }],
    actions: [{
      type: 'add',
      path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
      templateFile: 'plop-templates/Component.hbs',
    }]
  });

	plop.setGenerator('routes', {
		description: 'Create routes',
		prompts: [],
		actions: [{
			type: 'add',
			path: 'src/routes.ts',
			templateFile: 'plop-templates/routes.hbs'
		}]
	})
};
