// @flow
import * as React from 'react';
import SidebarItem from './sidebar-item';
import SvgIcon, { IconEnum } from '../svg-icon';
import SidebarSection from './sidebar-section';

type Props = {
  security: Object,
};

// Implemented as a class component because of a caveat with render props
// https://reactjs.org/docs/render-props.html#be-careful-when-using-render-props-with-reactpurecomponent
export default class SidebarSecurity extends React.Component<Props> {
  renderBody = (filter: string) => (
    <div>
      {Object.keys(this.props.security).map(scheme => (
        <React.Fragment key={scheme}>
          {scheme.toLowerCase().includes(filter) && (
            <SidebarItem>
              <div></div>
              <div>
                <SvgIcon icon={IconEnum.key} />
              </div>
              <span>{scheme}</span>
            </SidebarItem>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  render() {
    return <SidebarSection title="SECURITY" renderBody={this.renderBody} />;
  }
}