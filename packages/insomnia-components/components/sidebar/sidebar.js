// @flow
import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import SidebarHeader from './sidebar-header';
import SidebarInfo from './sidebar-info';
import SidebarServers from './sidebar-servers';
import SidebarPaths from './sidebar-paths';
import SidebarRequests from './sidebar-requests';
import SidebarResponses from './sidebar-responses';
import SidebarParameters from './sidebar-parameters';
import SidebarHeaders from './sidebar-headers';
import SidebarSchemas from './sidebar-schemas';
import SidebarSecurity from './sidebar-security';
import Dropdown from '../dropdown/dropdown';
import DropdownItem from '../dropdown/dropdown-item';
import DropdownDivider from '../dropdown/dropdown-divider';
import SvgIcon, { IconEnum } from '../svg-icon';

type Props = {|
  className?: string,
  jsonData: Object,
|};

const StyledSidebar: React.ComponentType<{}> = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
  border: none;
  color: var(--color-font);
  position: relative;
  svg {
    font-size: var(--font-size-xl);
    fill: var(--hl-lg);
  }
  .method {
    h6 {
      font-size: var(--font-size-xxs);
    }
  }
  .method-post {
    color: var(--color-success);
  }
  .method-get {
    color: var(--color-surprise);
  }
  .method-delete {
    color: var(--color-danger);
  }
  .method-parameters {
    display: none;
  }
  .method-options-head,
  .method-custom {
    color: var(--color-info);
  }
  .method-patch {
    color: var(--color-notice);
  }
  .method-put {
    color: var(--color-warning);
  }
  h6 {
    font-size: var(--font-size-xs);
    display: flex;
    flex-grow: 1;
    &:hover {
      cursor: default;
    }
  }
  h5 {
    font-size: var(--font-size-sm);
  }
  ul:first-child {
    border-top: none;
  }
  ul:last-child {
    border-bottom: none;
  }
`;

const StyledSection: React.ComponentType<{}> = styled(motion.ul)`
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid var(--hl-md);
`;

const DropdownEllipsis = () => <SvgIcon icon={IconEnum.ellipsesCircle} />;
// Section Expansion & Filtering
const useToggle = (state, set) =>
  React.useCallback(
    e => {
      e.stopPropagation();
      set(!state);
    },
    [set, state],
  );

function Sidebar(props: Props) {
  // Info (Can't hide info section)
  const [infoSec, setInfoSec] = useState(false);
  const toggleInfoSec = useToggle(infoSec, setInfoSec);

  // Section Visibility
  const [visible, setVisibility] = useState({
    pathsVisible: true,
    serversVisible: true,
    requestsVisible: true,
    responsesVisible: true,
    parametersVisible: true,
    headersVisible: true,
    schemasVisible: true,
    securityVisible: true,
  });
  const handlePathsVisibleClick = useToggle(visible.pathsVisible, setVisibility);
  const handleServersVisibleClick = useToggle(visible.serversVisible, setVisibility);
  const handleRequestsVisibleClick = useToggle(visible.requestsVisible, setVisibility);
  const handleResponsesVisibleClick = useToggle(visible.responsesVisible, setVisibility);
  const handleParametersVisibleClick = useToggle(visible.parametersVisible, setVisibility);
  const handleHeadersVisibleClick = useToggle(visible.headersVisible, setVisibility);
  const handleSchemasVisibleClick = useToggle(visible.schemasVisible, setVisibility);
  const handleSecurityVisibleClick = useToggle(visible.securityVisible, setVisibility);

  // Sections
  if (props.jsonData === null) {
    return null;
  }
  const { servers } = props.jsonData;
  const {
    requestBodies,
    responses,
    parameters,
    headers,
    schemas,
    securitySchemes,
  } = props.jsonData.components;
  const paths = Object.entries(props.jsonData.paths);

  return (
    <StyledSidebar className="theme--sidebar">
      <StyledSection>
        <SidebarHeader headerTitle="INFO" section={infoSec} toggleSection={toggleInfoSec}>
          <Dropdown renderButton={DropdownEllipsis}>
            <DropdownDivider>VISIBILITY</DropdownDivider>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handleServersVisibleClick}
                defaultChecked={visible.serversVisible}
              />
              <label htmlFor="servers">Servers</label>
            </DropdownItem>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handlePathsVisibleClick}
                defaultChecked={visible.pathsVisible}
              />
              <label htmlFor="paths">Paths</label>
            </DropdownItem>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handleRequestsVisibleClick}
                defaultChecked={visible.requestsVisible}
              />
              <label htmlFor="requests">Requests</label>
            </DropdownItem>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handleResponsesVisibleClick}
                defaultChecked={visible.responsesVisible}
              />
              <label htmlFor="responses">Responses</label>
            </DropdownItem>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handleParametersVisibleClick}
                defaultChecked={visible.parametersVisible}
              />
              <label htmlFor="parameters">Parameters</label>
            </DropdownItem>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handleHeadersVisibleClick}
                defaultChecked={visible.headersVisible}
              />
              <label htmlFor="headers">Headers</label>
            </DropdownItem>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handleSchemasVisibleClick}
                defaultChecked={visible.schemasVisible}
              />
              <label htmlFor="schemas">Schemas</label>
            </DropdownItem>
            <DropdownItem>
              <input
                type="checkbox"
                onClick={handleSecurityVisibleClick}
                defaultChecked={visible.securityVisible}
              />
              <label htmlFor="security">Security</label>
            </DropdownItem>
          </Dropdown>
        </SidebarHeader>
        <SidebarInfo parent={infoSec} info={props.jsonData.info} />
      </StyledSection>
      {visible.serversVisible && servers && <SidebarServers servers={servers} />}
      {visible.pathsVisible && paths && <SidebarPaths paths={paths} />}
      {visible.requestsVisible && requestBodies && <SidebarRequests requests={requestBodies} />}
      {visible.responsesVisible && responses && <SidebarResponses responses={responses} />}
      {visible.parametersVisible && parameters && <SidebarParameters parameters={parameters} />}
      {visible.headersVisible && headers && <SidebarHeaders headers={headers} />}
      {visible.schemasVisible && schemas && <SidebarSchemas schemas={schemas} />}
      {visible.securityVisible && schemas && <SidebarSecurity security={securitySchemes} />}
    </StyledSidebar>
  );
}

export default Sidebar;