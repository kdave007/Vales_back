/**
 * Mock Model for API testing
 * @class MockModel
 * @static
 */
class MockModel {
  /**
   * Returns standardized mock API response
   * @returns {Promise<Object>} { status, data }
   */
  static async findAll() {
    return {
      status: 'Pancho el rey palomo!',
      data: {
        message: 'API test successful',
        items: [
          { id: 1, name: 'Test Item 1' },
          { id: 2, name: 'Test Item 2' }
        ],
        timestamp: new Date().toISOString()
      }
    };
  }
}

module.exports = MockModel;
