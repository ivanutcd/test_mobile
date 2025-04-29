import MainCard from '@common/ui-component/cards/main-card.tsx';
import { BaseTemplateProps } from './componentsProps';

const BaseTemplate = ({
  title,
  children,
  divider = true,
}: BaseTemplateProps) => {
  return (
    <MainCard divider={divider} title={title} darkTitle>
      {children}
    </MainCard>
  );
};

export default BaseTemplate;
