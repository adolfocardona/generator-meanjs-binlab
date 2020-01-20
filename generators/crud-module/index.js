"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
var inflections = require("underscore.inflections");
var s = require("underscore.string");
var _ = require("lodash");
var mkdirp = require("mkdirp");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the spectacular ${chalk.red(
          "generator-meanjs-binlab"
        )} crud-module!`
      )
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the module?",
        default: "Articles"
      },
      {
        type: "checkbox",
        name: "clientFolders",
        message:
          "Which client-side folders would you like your module to include?",
        choices: [
          {
            value: "addCSSFolder",
            name: "css",
            checked: false
          },
          {
            value: "addImagesFolder",
            name: "img",
            checked: false
          },
          {
            value: "addDirectivesFolder",
            name: "directives",
            checked: false
          },
          {
            value: "addFiltersFolder",
            name: "filters",
            checked: false
          }
        ]
      },
      {
        type: "confirm",
        name: "addMenuItems",
        message: "Would you like to add the CRUD module links to a menu?",
        default: true
      },
      {
        name: "menuId",
        message:
          'What is your menu identifier(Leave it empty and press ENTER for the default "topbar" menu)?',
        default: "topbar"
      }
    ]);

    var slugifiedName = s(this.answers.name)
      .slugify()
      .value();
    var slugifiedPluralName = inflections.pluralize(slugifiedName);
    var slugifiedSingularName = inflections.singularize(slugifiedName);
    var camelizedPluralName = s(slugifiedPluralName)
      .camelize()
      .value();
    var camelizedSingularName = s(slugifiedSingularName)
      .camelize()
      .value();
    var classifiedPluralName = s(slugifiedPluralName)
      .classify()
      .value();
    var classifiedSingularName = s(slugifiedSingularName)
      .classify()
      .value();
    var humanizedPluralName = s(slugifiedPluralName)
      .humanize()
      .value();
    var humanizedSingularName = s(slugifiedSingularName)
      .humanize()
      .value();
    var capitalizedSingularName = s(humanizedSingularName)
      .capitalize()
      .value();

    this.variablesPath = {
      slugifiedName: slugifiedName,
      slugifiedPluralName: slugifiedPluralName,
      slugifiedSingularName: slugifiedSingularName,
      camelizedPluralName: camelizedPluralName,
      camelizedSingularName: camelizedSingularName,
      classifiedPluralName: classifiedPluralName,
      classifiedSingularName: classifiedSingularName,
      humanizedPluralName: humanizedPluralName,
      humanizedSingularName: humanizedSingularName,
      capitalizedSingularName: capitalizedSingularName
    };

    var clientFolders = {};
    var serverFolders = {};

    _.forEach(this.answers.clientFolders, function(prop) {
      clientFolders[prop] = true;
    });
    _.forEach(this.answers.serverFolders, function(prop) {
      serverFolders[prop] = true;
    });

    this.clientFolders = clientFolders;
    this.serverFolders = serverFolders;

    this.addMenuItems = this.answers.addMenuItems;
  }

  writing() {
    // Create module folder
    mkdirp.sync("modules/" + this.variablesPath.slugifiedPluralName);

    // Create module supplemental folders
    if (this.clientFolders.addCSSFolder) {
      mkdirp.sync(
        "modules/" + this.variablesPath.slugifiedPluralName + "/client/css"
      );
    }

    if (this.clientFolders.addImagesFolder) {
      mkdirp.sync(
        "modules/" + this.variablesPath.slugifiedPluralName + "/client/img"
      );
    }

    if (this.clientFolders.addDirectivesFolder) {
      mkdirp.sync(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/directives"
      );
    }

    if (this.clientFolders.addFiltersFolder) {
      mkdirp.sync(
        "modules/" + this.variablesPath.slugifiedPluralName + "/client/filters"
      );
    }

    this.fs.copyTpl(
      this.templatePath("client/config/_.client.routes.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/config/" +
          this.variablesPath.slugifiedPluralName +
          ".client.routes.js"
      ),
      this.variablesPath
    );

    // Render angular module files
    this.fs.copyTpl(
      this.templatePath("client/config/_.client.routes.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/config/" +
          this.variablesPath.slugifiedPluralName +
          ".client.routes.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("client/controllers/_.client.controller.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/controllers/" +
          this.variablesPath.slugifiedPluralName +
          ".client.controller.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("client/controllers/_.list.client.controller.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/controllers/list-" +
          this.variablesPath.slugifiedPluralName +
          ".client.controller.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("client/services/_.client.service.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/services/" +
          this.variablesPath.slugifiedPluralName +
          ".client.service.js"
      ),
      this.variablesPath
    );

    // Render angular tests
    this.fs.copyTpl(
      this.templatePath("tests/client/_.client.controller.tests.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/tests/client/" +
          this.variablesPath.slugifiedPluralName +
          ".client.controller.tests.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("tests/client/_.client.routes.tests.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/tests/client/" +
          this.variablesPath.slugifiedPluralName +
          ".client.routes.tests.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("tests/client/_.list.client.controller.tests.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/tests/client/list-" +
          this.variablesPath.slugifiedPluralName +
          ".client.controller.tests.js"
      ),
      this.variablesPath
    );

    // Render angular module views
    this.fs.copyTpl(
      this.templatePath("client/views/_.form.client.view.html"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/views/form-" +
          this.variablesPath.slugifiedSingularName +
          ".client.view.html"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("client/views/_.view.client.view.html"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/views/view-" +
          this.variablesPath.slugifiedSingularName +
          ".client.view.html"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("client/views/_.list.client.view.html"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/views/list-" +
          this.variablesPath.slugifiedPluralName +
          ".client.view.html"
      ),
      this.variablesPath
    );

    // Render menu configuration
    if (this.answers.addMenuItems) {
      this.fs.copyTpl(
        this.templatePath("client/config/_.client.config.js"),
        this.destinationPath(
          "modules/" +
            this.variablesPath.slugifiedPluralName +
            "/client/config/" +
            this.variablesPath.slugifiedPluralName +
            ".client.config.js"
        ),
        this.variablesPath
      );
    }

    // Render angular module definition
    this.fs.copyTpl(
      this.templatePath("client/_.client.module.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/client/" +
          this.variablesPath.slugifiedPluralName +
          ".client.module.js"
      ),
      this.variablesPath
    );

    // Render e2e tests
    this.fs.copyTpl(
      this.templatePath("tests/e2e/_.e2e.tests.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/tests/e2e/" +
          this.variablesPath.slugifiedPluralName +
          ".e2e.tests.js"
      ),
      this.variablesPath
    );

    // Render server module config
    this.fs.copyTpl(
      this.templatePath("server/config/_.server.config.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/server/config/" +
          this.variablesPath.slugifiedPluralName +
          ".server.config.js"
      ),
      this.variablesPath
    );

    // Render express module files
    this.fs.copyTpl(
      this.templatePath("server/controllers/_.server.controller.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/server/controllers/" +
          this.variablesPath.slugifiedPluralName +
          ".server.controller.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("server/models/_.server.model.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/server/models/" +
          this.variablesPath.slugifiedSingularName +
          ".server.model.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("server/routes/_.server.routes.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/server/routes/" +
          this.variablesPath.slugifiedPluralName +
          ".server.routes.js"
      ),
      this.variablesPath
    );

    // Render express policy
    this.fs.copyTpl(
      this.templatePath("server/policies/_.server.policy.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/server/policies/" +
          this.variablesPath.slugifiedPluralName +
          ".server.policy.js"
      ),
      this.variablesPath
    );

    // Add express module tests
    this.fs.copyTpl(
      this.templatePath("tests/server/_.server.model.tests.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/tests/server/" +
          this.variablesPath.slugifiedSingularName +
          ".server.model.tests.js"
      ),
      this.variablesPath
    );
    this.fs.copyTpl(
      this.templatePath("tests/server/_.server.routes.tests.js"),
      this.destinationPath(
        "modules/" +
          this.variablesPath.slugifiedPluralName +
          "/tests/server/" +
          this.variablesPath.slugifiedSingularName +
          ".server.routes.tests.js"
      ),
      this.variablesPath
    );
  }

  install() {
    // This.installDependencies();
  }
};
