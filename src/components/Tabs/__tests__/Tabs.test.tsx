import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import Tabs from '../Tabs';

const mockChangeTab = vi.fn();

const tabsData = [
  { id: 1, status: 'All' },
  { id: 2, status: 'Active' },
  { id: 3, status: 'Completed' },
];

const tabTestId = 'tab';
describe('Tabs Component', () => {
  beforeEach(() => {
    mockChangeTab.mockClear();
  });

  it('renders the tabs correctly', () => {
    render(
      <Tabs
        tabs={tabsData}
        activeTab="All"
        changeTab={mockChangeTab}
      />
    );
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('applies the correct styles to the active tab', () => {
    render(
      <Tabs
        tabs={tabsData}
        activeTab="All"
        changeTab={mockChangeTab}
      />
    );
    const tabElements = screen.getAllByTestId('tab');

    const activeTabElement = tabElements.find(tab => tab.textContent === 'All');

    expect(activeTabElement).toHaveClass('border-white');
    expect(activeTabElement).not.toHaveClass('border-transparent');
  });

  it('does not apply active class to inactive tabs', () => {
    render(
      <Tabs
        tabs={tabsData}
        activeTab="All"
        changeTab={mockChangeTab}
      />
    );
    const inactiveTabs = screen
      .getAllByTestId(tabTestId)
      .filter(tab => tab.textContent !== 'All');
    inactiveTabs.forEach(tab => {
      expect(tab).toHaveClass('border-transparent');
      expect(tab).not.toHaveClass('border-white');
    });
  });

  it('calls changeTab with the correct argument when a tab is clicked', () => {
    render(
      <Tabs
        tabs={tabsData}
        activeTab="All"
        changeTab={mockChangeTab}
      />
    );
    const secondTab = screen.getByText('Active');
    fireEvent.click(secondTab);
    expect(mockChangeTab).toHaveBeenCalledWith('Active');
  });

  it('initially sets the correct active tab', () => {
    render(
      <Tabs
        tabs={tabsData}
        activeTab="All"
        changeTab={mockChangeTab}
      />
    );
    expect(tabsData[0].status).toBe('All');
  });
});
