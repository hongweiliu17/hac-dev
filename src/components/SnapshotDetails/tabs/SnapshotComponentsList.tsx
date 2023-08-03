import * as React from 'react';
import {
  PageSection,
  PageSectionVariants,
  SearchInput,
  Text,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { useSearchParam } from '../../../hooks/useSearchParam';
import { Table } from '../../../shared';
import FilteredEmptyState from '../../EmptyState/FilteredEmptyState';
import CommitsEmptyState from './SnapshotComponentsEmptyState';
import CommitsListHeader from './SnapshotComponentsListHeader';
import CommitsListRow from './SnapshotComponentsListRow';

interface SnapshotComponentsListProps {
  applicationName?: string;
  components: any;
}

const SnapshotComponentsList: React.FC<SnapshotComponentsListProps> = ({
  applicationName,
  components,
}) => {
  const [nameFilter, setNameFilter] = useSearchParam('name', '');

  const filteredComponents = React.useMemo(
    () =>
      components.filter(
        (component) => !nameFilter || component.metadata?.name.indexOf(nameFilter.trim()) !== -1,
      ),
    [nameFilter, components],
  );

  const onClearFilters = () => setNameFilter('');
  const onNameInput = (name: string) => setNameFilter(name);

  return (
    <PageSection padding={{ default: 'noPadding' }} variant={PageSectionVariants.light} isFilled>
      <>
        <Title size="lg" headingLevel="h2" className="pf-c-title pf-u-mt-lg pf-u-mb-sm">
          Components
        </Title>
        {!components || components.length === 0 ? (
          <CommitsEmptyState applicationName={applicationName} />
        ) : (
          <>
            <Text className="pf-u-mb-lg">Component builds that are included in this snapshot</Text>

            <Toolbar data-test="component-list-toolbar" clearAllFilters={onClearFilters}>
              <ToolbarContent>
                <ToolbarGroup alignment={{ default: 'alignLeft' }}>
                  <ToolbarItem className="pf-u-ml-0">
                    <SearchInput
                      name="nameInput"
                      data-test="name-input-filter"
                      type="search"
                      aria-label="name filter"
                      placeholder="Filter by name..."
                      onChange={(e, name) => onNameInput(name)}
                      value={nameFilter}
                    />
                  </ToolbarItem>
                </ToolbarGroup>
              </ToolbarContent>
            </Toolbar>

            {filteredComponents.length > 0 ? (
              <Table
                data={filteredComponents}
                aria-label="Component List"
                Header={CommitsListHeader}
                Row={CommitsListRow}
                loaded
                getRowProps={(obj) => ({
                  id: obj.sha,
                })}
              />
            ) : (
              <FilteredEmptyState onClearFilters={onClearFilters} />
            )}
          </>
        )}
      </>
    </PageSection>
  );
};

export default SnapshotComponentsList;
