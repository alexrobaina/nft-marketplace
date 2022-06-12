const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TreeLoveCoin", function () {
  it("Should return the new greeting once it's changed", async function () {
    const TreeLoveCoin = await ethers.getContractFactory("TreeLoveCoin");
    const treeLoveCoin = await TreeLoveCoin.deploy("Hello, world!");
    await treeLoveCoin.deployed();

    expect(await treeLoveCoin.greet()).to.equal("Hello, world!");

    const setTreeLoveCoinTx = await treeLoveCoin.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setTreeLoveCoinTx.wait();

    expect(await treeLoveCoin.greet()).to.equal("Hola, mundo!");
  });
});
