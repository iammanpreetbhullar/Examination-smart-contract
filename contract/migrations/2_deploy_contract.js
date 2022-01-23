const IeltsContract = artifacts.require("IeltsContract");

module.exports = function (deployer) {
  deployer.deploy(IeltsContract);
};
