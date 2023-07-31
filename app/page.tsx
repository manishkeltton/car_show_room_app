"use client"

import { CarCard, Hero, ShowMore } from '@/components'
import CustomFilter from '@/components/CustomFilter'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { fuels, yearsOfProduction } from '@/constants'
import { HomeProps } from '@/types'
import { fetchCars } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home({ searchParams }: HomeProps) {
  const [allCarsData, setAllCarsData] = useState("")
  const [stateData, setStateData] = useState({
    offset: 0,
    data: [],
    perPage: 5,
    currentPage: 0,
    pageCount: 0
  })
  useEffect(() => {
    receivedData()
  }, [])

  const receivedData = async () => {

    const allCars = await fetchCars({
      manufacturer: searchParams.manufacturer || "",
      year: searchParams.year || 2022,
      fuel: searchParams.fuel || "",
      limit: searchParams.limit || 10,
      model: searchParams.model || "",
    });
    const slice = allCars.slice(stateData.offset, stateData.offset + stateData.perPage)
    setStateData({
      ...stateData,
      pageCount: Math.ceil(allCars.length / stateData.perPage),
      data: slice
    })
    setAllCarsData(allCars)
  }

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * stateData.perPage;

    setStateData({
      ...stateData,
      currentPage: selectedPage,
      offset: offset
    })

    receivedData()

  };


  console.log("stateData => ", stateData);

  console.log("allCarsData => ", allCarsData);
  const isDataEmpty = !Array.isArray(allCarsData) || allCarsData.length < 1 || !allCarsData;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover">
        <div className='home__text-container'>
          <h1 className='text-4x1 font-extrabold'>
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {stateData?.data?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {/* <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCarsData.length}
            /> */}
            <Pagination pageCount={stateData?.pageCount} handlePageClick={handlePageClick} />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            {/* <p>{allCarsData?.message}</p> */}
          </div>
        )}
      </div>
    </main>
  )
}
