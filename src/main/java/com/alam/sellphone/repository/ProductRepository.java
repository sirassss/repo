package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Banner;
import com.alam.sellphone.domain.Product;
import com.alam.sellphone.service.dto.ManufacturedDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
    @Query(value = " select * from Product where ID in ?1", nativeQuery = true)
    List<Product> getAllProductsByID(List<Long> productID);

    @Query(
        value = " select sp.ID, Code, Name, Quantity, UnitPrice, Installment, AccompanyingProducts, Warranty, CreatedDate, CreatedUser, ModifiedDate, ModifiedUser, Rate, VoucherID, BannerID, sp.TypeID, IsNew from Product sp inner join Banner bn on sp.BannerID = bn.ID and bn.TypeID = ?1 ",
        nativeQuery = true
    )
    List<Product> getListPro(Integer typeID);

    @Query(
        value = " select sp.ID, Code, Name, Quantity, UnitPrice, Installment, AccompanyingProducts, Warranty, CreatedDate, CreatedUser, ModifiedDate, ModifiedUser, Rate, VoucherID, BannerID, sp.TypeID, IsNew from Product sp inner join Banner bn on sp.BannerID = bn.ID and bn.TypeID = ?1 ",
        nativeQuery = true
    )
    List<Product> getListPro2(Integer typeID);

    @Query(
        value = " select sp.ID, Code, Name, Quantity, UnitPrice, Installment, AccompanyingProducts, Warranty, CreatedDate, CreatedUser, ModifiedDate, ModifiedUser, Rate, VoucherID, BannerID, sp.TypeID, IsNew from Product sp inner join Banner bn on sp.BannerID = bn.ID and bn.TypeID = ?1 ",
        nativeQuery = true
    )
    List<Product> getDoubleBanner(Integer typeID);

    @Query(
        value = " select sp.ID, Code, Name, Quantity, UnitPrice, Installment, AccompanyingProducts, Warranty, CreatedDate, CreatedUser, ModifiedDate, ModifiedUser, Rate, VoucherID, BannerID, sp.TypeID, IsNew from Product sp inner join Banner bn on sp.BannerID = bn.ID and bn.TypeID = ?1 ",
        nativeQuery = true
    )
    List<Product> getBannerList(Integer typeID);

    @Query(
        value = " select sp.ID, Code, Name, Quantity, UnitPrice, Installment, AccompanyingProducts, Warranty, CreatedDate, CreatedUser, ModifiedDate, ModifiedUser, Rate, VoucherID, BannerID, sp.TypeID, IsNew from Product sp inner join Banner bn on sp.BannerID = bn.ID and bn.TypeID = ?1 ",
        nativeQuery = true
    )
    List<Product> getThreeBanner(Integer typeID);

    @Query(
        value = " select sp.ID, Code, Name, Quantity, UnitPrice, Installment, AccompanyingProducts, Warranty, CreatedDate, CreatedUser, ModifiedDate, ModifiedUser, Rate, VoucherID, BannerID, sp.TypeID, IsNew from Product sp inner join Banner bn on sp.BannerID = bn.ID and bn.TypeID = ?1 ",
        nativeQuery = true
    )
    List<Product> getListProManufacturer(Integer typeID);

    @Query(
        value = " select mf.ID, Name, Image, Description, BannerID from Manufactured mf  inner join Banner bn on mf.BannerID = bn.ID and bn.TypeID = ?1 ",
        nativeQuery = true
    )
    List<ManufacturedDTO> getListManufacturer(Integer typeID);
}
