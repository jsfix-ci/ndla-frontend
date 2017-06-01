/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResourceList } from 'ndla-ui';
import { ResourceTypeShape } from '../../shapes';
import { getResourceTypesByTopicId } from './resourceSelectors';
import {
  resourceToLinkProps as resourceToLinkPropsHelper,
} from './resourceHelpers';

class Resources extends Component {
  componentWillMount() {}

  componentWillReceiveProps() {}

  render() {
    const { match: { params }, topicResourcesByType } = this.props;

    const resourceToLinkProps = resource =>
      resourceToLinkPropsHelper(resource, params.subjectId, params.topicId);

    return (
      <div>
        {topicResourcesByType.map(type => (
          <div key={type.id}>
            <h1>{type.name}</h1>
            <ResourceList
              resourceToLinkProps={resourceToLinkProps}
              resources={type.resources.map(resource => ({
                ...resource,
                icon: 'Pencil',
              }))}
            />
          </div>
        ))}
      </div>
    );
  }
}

Resources.propTypes = {
  topicResourcesByType: PropTypes.arrayOf(ResourceTypeShape),
  match: PropTypes.shape({
    params: PropTypes.shape({
      subjectId: PropTypes.string.isRequired,
      topicId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { topicId } = ownProps;
  return {
    topicResourcesByType: getResourceTypesByTopicId(topicId)(state),
  };
};

export default withRouter(connect(mapStateToProps)(Resources));
