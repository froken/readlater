using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReadLater.BusinessLogic.Pocket;
using System.Threading.Tasks;

namespace ReadLater.Tests
{
    [TestClass]
    public class PocketServiceTests
    {
        [TestMethod]
        [TestCategory("Integration")]
        public async Task RequestTokenAsync_RequestIsValid_ReturnToken()
        {
            // Arrange
            var service = new PocketService(null);

            // Act
            var token = await service.GetRequestTokenAsync();

            // Assert
            Assert.IsNotNull(token);
        }

        [TestMethod]
        [TestCategory("Integration")]
        public async Task AccessTokenAsync_RequestIsValid_ReturnToken()
        {
            // Arrange
            var service = new PocketService(null);

            // Act
            var code = await service.GetRequestTokenAsync();
            var token = await service.GetAccessTokenAsync(code);

            // Assert
            Assert.IsNotNull(token);
        }

        [TestMethod]
        [TestCategory("Integration")]
        public async Task GetReadList_RequestIsValid_ReturnList()
        {
            // Arrange
            var service = new PocketService(null);
            var accessCode = "af098d5d-6981-62f9-0deb-a49836";

            // Act
            var code = await service.GetReadListAsync(accessCode);
         
            // Assert
            Assert.IsNotNull(code);
        }
    }
}
