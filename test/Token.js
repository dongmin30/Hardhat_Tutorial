const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    // ethers.js의 해당 함수는 Signer 이더리움 계정을 나타내는 객체입니다.
    // 계약 및 기타 계정으로 거래를 보내는 데에 사용됩니다.
    // ether 함수는 전역 범위에서 사용가능합니다.
    const [owner] = await ethers.getSigners();

    // Token contract의 배포가 시작되고 promise 방식으로 반환합니다.
    const hardhatToken = await ethers.deployContract("Token");

    // 배포된 계약 메서드를 호출하여 사용합니다.
    // 여기에서는 Token contract의 메서드를 호출하여 소유자(owner)의 잔액을 얻습니다.
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    // 토큰을 배포하는 계정은 전체 Suppply를 받습니다. (owner)
    // 그리고 해당 코드를 통해 토큰 공급량을 반환하고 ownerBalance의 객체 값과 같은지 확인합니다.
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  // 기본 계정이 아닌 다른 계정에서 트랜잭션을 전송하여 코드를 테스트 해야하는 경우는 아래와 같이 테스트가 가능합니다.
  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract("Token");

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });
});