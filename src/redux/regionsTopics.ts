import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RegionId, Region, Topic } from '@src/types'
import { fetchMeta } from '@src/redux/asyncActions'
import { RootState } from '@src/redux'

interface State {
  regions: {
    byId: Record<RegionId, Region>
    allIds: RegionId[]
  }
  topics: {
    allIds: Topic[]
  }
  loaded: boolean
}

const initialState: State = {
  regions: { byId: {}, allIds: [] },
  topics: { allIds: [] },
  loaded: false
}

const regionsTopicsSlice = createSlice({
  name: 'regionsTopics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMeta.fulfilled, (state, action) => {
      const { regions, topics } = action.payload
      state.regions.allIds = regions.map((r) => r.id)
      for (const region of regions) {
        state.regions.byId[region.id] = region
      }
      state.topics.allIds = topics
    })
  }
})

export const selectRegionTopicLoaded = (state: RootState) => state.regionsTopics.loaded

export default regionsTopicsSlice.reducer
