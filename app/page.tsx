"use client"

import { CarCard, Hero } from '@/components'
import CustomFilter from '@/components/CustomFilter'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { fuels, yearsOfProduction } from '@/constants'
import { HomeProps } from '@/types'
import { fetchCars } from '@/utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { carCurrentPage, carDetailsData, carOffset, carPageCount } from '@/redux/carDetailSlice/carDetailSlice'

export default function Home({ searchParams }: HomeProps) {

  const [allCarsData, setAllCarsData] = useState("")
  const dispatch = useDispatch()
  const selectData = useSelector((state: any) => state.carData)
  useEffect(() => {
    receivedData()
  }, [selectData])

  console.log("selectData => ", selectData);


  const receivedData = async () => {

    const allCars = await fetchCars({
      manufacturer: searchParams.manufacturer || "",
      year: searchParams.year || 2022,
      fuel: searchParams.fuel || "",
      limit: searchParams.limit || 10,
      model: searchParams.model || "",
    });
    const slice = await allCars.slice(selectData.offset, selectData.offset + selectData.perPage)
    dispatch(carDetailsData(slice))
    dispatch(carPageCount(Math.ceil(allCars.length / selectData.perPage)))
    setAllCarsData(allCars)
  }

  const handlePageClick = async (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * selectData.perPage;
    dispatch(carCurrentPage(selectedPage))
    dispatch(carOffset(offset))

    await receivedData()

  };

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
              {selectData?.data?.map((car: any) => (
                <CarCard car={car} />
              ))}
            </div>
            <Pagination pageCount={selectData?.pageCount} handlePageClick={handlePageClick} />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  )
}
