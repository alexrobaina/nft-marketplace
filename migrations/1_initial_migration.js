const Migrations = artifacts.require("Migrations");
const TreeLoveCoin = artifacts.require("TreeLoveCoin");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TreeLoveCoin);
};
