using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReadLater.Services;
using ReadLater.Services.Pocket;
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
            var service = new PocketService();

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
            var service = new PocketService();

            // Act
            var code = await service.GetRequestTokenAsync();
            var token = await service.GetAccessTokenAsync(code);

            // Assert
            Assert.IsNotNull(token);
        }
    }
}
