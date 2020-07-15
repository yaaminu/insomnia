// @flow
import * as React from 'react';
import Tooltip from '../tooltip';
import SidebarItem from './sidebar-item';
import SvgIcon, { IconEnum } from '../svg-icon';
import SidebarSection from './sidebar-section';

type Props = {
  parameters: Object,
};

let itemPath = [];
const handleClick = items => {
  itemPath.push('parameter');
  itemPath.push.apply(itemPath, items);
  console.log(itemPath);
  itemPath = [];
};

// Implemented as a class component because of a caveat with render props
// https://reactjs.org/docs/render-props.html#be-careful-when-using-render-props-with-reactpurecomponent
export default class SidebarParameters extends React.Component<Props> {
  renderBody = (filter: string) => (
    <div>
      {Object.keys(this.props.parameters).map(parameter => (
        <React.Fragment key={parameter}>
          {parameter.toLowerCase().includes(filter.toLocaleLowerCase()) && (
            <SidebarItem>
              <div></div>
              <div>
                <SvgIcon icon={IconEnum.indentation} />
              </div>
              <span onClick={() => handleClick([parameter])}>
                <Tooltip message={this.props.parameters[parameter].description} position="right">
                  {parameter}
                </Tooltip>
              </span>
            </SidebarItem>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  render() {
    return <SidebarSection title="PARAMETERS" renderBody={this.renderBody} />;
  }
}
