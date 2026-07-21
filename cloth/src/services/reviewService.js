class ReviewService {

  async createReview(
    reviewData
  ) {

    /*
      POST /reviews
    */

    return reviewData;
  }

  async getProductReviews(
    productId
  ) {

    /*
      GET /reviews/:productId
    */

    return [];
  }


  async updateReview(
  reviewId,
  reviewData
) {

  /*
    PUT /reviews/:id
  */

  return reviewData;
}

  async deleteReview(
    reviewId
  ) {

    /*
      DELETE /reviews/:id
    */

    return true;
  }
}

export default new ReviewService();