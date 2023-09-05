import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

type CustomRenderOptions = RenderOptions & {
    mocks?: MockedResponse[];
};

const customRender = (
    ui: React.ReactElement,
    { mocks = [], ...renderOptions }: CustomRenderOptions = {}
  ): RenderResult => {
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
  
    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };
  

export * from '@testing-library/react';
export { customRender as render };
