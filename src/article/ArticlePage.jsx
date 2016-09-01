/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './articleActions';
import { getArticle } from './articleSelectors';

class ArticlePage extends Component {
  componentWillMount() {
    const { fetchArticle, params: { articleId } } = this.props;
    fetchArticle(articleId);
  }

  render() {
    const { article } = this.props;
    return (
      <div className="article" dangerouslySetInnerHTML={{ __html: article.html }} />
    );
  }
}

ArticlePage.propTypes = {
  params: PropTypes.shape({
    articleId: PropTypes.string.isRequired,
  }).isRequired,
  article: PropTypes.object.isRequired,
  fetchArticle: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchArticle: actions.fetchArticle,
};

const mapStateToProps = (state) => ({
  article: getArticle(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
