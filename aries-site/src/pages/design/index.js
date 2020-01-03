import React from 'react';
import { PageLayout, NavPage, SideBarItemList } from '../../layouts';
import { DescriptiveHeader } from '../../components/headings';
import { data } from '../../components/home';

const title = 'Design';
const prefix = title.toLowerCase();

const Design = () => {
  const titleObject = data[title];

  const descriptiveHeader = (
    <DescriptiveHeader
      background={titleObject.color}
      subText={titleObject.subTitle}
      icon={titleObject.icon}
      title={title}
    />
  );

  return (
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <NavPage items={SideBarItemList[prefix]} prefix={prefix} />
    </PageLayout>
  );
};

export default Design;