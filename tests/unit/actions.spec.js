import { actions } from '../../src/store/actions'

describe('Store Actions', () => {
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ el: { url: 'https://thawing-springs-53971.herokuapp.com' }, node_name: 'Test Name' }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it('getAllNodes With Success', async () => {
    const commit = jest.fn();
    const block = {
      nodes: {
        list: [ 
          {
            url: 'https://thawing-springs-53971.herokuapp.com',
            online: false,
            name: 'Node 1',
            loading: false,
          },
        ]
      }
    };
    const param = block.nodes.list;
    await actions.getAllNodes({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusStart', param[0]);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusSuccess', { el: param[0], name: 'Test Name' });
  });

  it('getAllNodes With failure', async () => {
    const commit = jest.fn();
    fetch.mockImplementationOnce(() => Promise.reject());
    const block = {
      nodes: {
        list: [ 
          {
            url: 'http://localhost:3002',
            online: false,
            name: 'Node 4',
            loading: false
          },
        ]
      }
    };
    const param = block.nodes.list;
    await actions.getAllNodes({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusStart', param[0]);
    expect(commit).toHaveBeenCalledWith('checkNodeStatusFailure', param[0]);
  });
});