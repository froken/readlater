using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReadLater.Services;
using System.Threading.Tasks;

namespace ReadLater.Tests
{
    [TestClass]
    public class PocketServiceTests
    {
        [TestMethod]
        [TestCategory("Integration")]
        public async Task RequestTokenAsync()
        {
            // Arrange
            var service = new PocketService();

            // Act
            var token = await service.GetRequestTokenAsync();

            // Assert
            Assert.IsNotNull(token);
        }
    }
}
