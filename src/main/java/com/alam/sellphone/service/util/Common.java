package com.alam.sellphone.service.util;

import com.tngtech.archunit.thirdparty.com.google.common.base.Strings;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.Map.Entry;
import javax.persistence.Query;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * @author congnd
 */
public class Common {

    private static final Logger log = LoggerFactory.getLogger(Common.class);

    /**
     * @param sort
     * @return
     */
    public static String addSort(Sort sort) {
        StringBuilder orderSql = new StringBuilder();
        if (sort == null) return "";
        for (Sort.Order order : sort) {
            if (orderSql.length() > 0) {
                orderSql.append(", ");
            } else {
                orderSql.append("ORDER BY ");
            }
            orderSql.append(order.getProperty());
            orderSql.append(" ");
            orderSql.append(order.getDirection());
        }
        return orderSql.toString();
    }

    public static String formatText(String value) {
        value = value.trim();
        value = value.replaceAll("\\s+", " ");
        return value;
    }

    /**
     * @Author phuonghv
     */
    public static String addMultiSort(Sort sort) {
        StringBuilder orderSql = new StringBuilder();
        if (sort == null) {
            return "";
        }
        orderSql.append("ORDER BY ");
        int i = 0;
        for (Sort.Order order : sort) {
            if (i > 0) {
                orderSql.append(", ");
            }
            orderSql.append(order.getProperty());
            orderSql.append(" ");
            orderSql.append(order.getDirection());
            i++;
        }
        return orderSql.toString();
    }

    public static Integer getNumberOfDayInMonth(Integer month, Integer year) {
        int number = 0;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                number = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                number = 30;
                break;
            case 2:
                {
                    if ((year % 400 == 0) || (year % 4 == 0 & year % 100 == 0)) {
                        number = 29;
                    } else {
                        number = 28;
                    }
                    break;
                }
            default:
                number = 0;
                break;
        }
        return number;
    }

    /**
     * @param query
     * @param params
     * @Author hieugie
     * <p>
     * Hàm chung set param cho query
     */
    public static void setParams(Query query, Map<String, Object> params) {
        if (params != null && !params.isEmpty()) {
            Set<Entry<String, Object>> set = params.entrySet();
            for (Entry<String, Object> obj : set) {
                if (obj.getValue() == null) query.setParameter(obj.getKey(), ""); else query.setParameter(obj.getKey(), obj.getValue());
            }
        }
    }

    /**
     * @param query
     * @param params
     * @Author hieugie
     * <p>
     * Hàm chung set param và pageable cho query
     * Set lại giá trị offset trong trong hợp offset > tổng số bản ghi tìm được
     */
    public static void setParamsWithPageable(
        @NotNull Query query,
        Map<String, Object> params,
        @NotNull Pageable pageable,
        @NotNull Number total
    ) {
        if (params != null && !params.isEmpty()) {
            Set<Entry<String, Object>> set = params.entrySet();
            for (Entry<String, Object> obj : set) {
                query.setParameter(obj.getKey(), obj.getValue());
            }
        }
        //        if (total.intValue() < (int)pageable.getOffset()) {
        //            pageable = PageRequest.of(0, pageable.getPageSize(), pageable.getSort());
        //        }
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
    }

    /**
     * @param fromDate   từ ngày - string yyyyMMdd
     * @param toDate     đến ngày - string yyyyMMdd
     * @param params     map các params
     * @param sqlBuilder câu sql
     * @param columnName tên cột ngày tháng cần truy vấn
     * @author dungvm
     * <p>
     * Thêm điều kiện ngày tháng nằm trong khoảng cho câu lệnh sql
     */
    public static void addDateSearch(
        String fromDate,
        String toDate,
        Map<String, Object> params,
        StringBuilder sqlBuilder,
        String columnName
    ) {
        if (!Strings.isNullOrEmpty(fromDate) && !Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append(
                "AND :fromDate" +
                columnName +
                " <= CONVERT(varchar, " +
                columnName +
                ", 112) AND :toDate" +
                columnName +
                " " +
                ">= CONVERT(varchar, " +
                columnName +
                ", 112) "
            );
            params.put("fromDate" + columnName, fromDate);
            params.put("toDate" + columnName, toDate);
        } else if (!Strings.isNullOrEmpty(fromDate)) {
            sqlBuilder.append("AND :fromDate" + columnName + " <= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("fromDate" + columnName, fromDate);
        } else if (!Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append("AND :toDate" + columnName + " >= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("toDate" + columnName, toDate);
        }
    }

    /**
     * @param fromDate   từ ngày - string yyyyMMdd
     * @param toDate     đến ngày - string yyyyMMdd
     * @param params     map các params
     * @param sqlBuilder câu sql
     * @param columnName tên cột ngày tháng cần truy vấn
     * @author phuonghv
     * <p>
     * Thêm điều kiện ngày tháng nằm trong khoảng cho câu lệnh sql
     */
    public static void addDateSearchCustom(
        String fromDate,
        String toDate,
        Map<String, Object> params,
        StringBuilder sqlBuilder,
        String columnName,
        String param
    ) {
        if (!Strings.isNullOrEmpty(fromDate) && !Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append(
                "AND :from" +
                param +
                " <= CONVERT(varchar, " +
                columnName +
                ", 112) AND :to" +
                param +
                " >= CONVERT(varchar, " +
                columnName +
                ", 112) "
            );
            params.put("from" + param, fromDate);
            params.put("to" + param, toDate);
        } else if (!Strings.isNullOrEmpty(fromDate)) {
            sqlBuilder.append("AND :from" + param + " <= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("from" + param, fromDate);
        } else if (!Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append("AND :to" + param + " >= CONVERT(varchar, " + columnName + ", 112) ");
            params.put("to" + param, toDate);
        }
    }

    public static void addDateSearchCustom(
        String fromDate,
        String toDate,
        Map<String, Object> params,
        StringBuilder sqlBuilder,
        String columnName1,
        String columnName2,
        String param
    ) {
        if (!Strings.isNullOrEmpty(fromDate) && !Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append(
                " AND ((:from" +
                param +
                " <= CONVERT(varchar, " +
                columnName1 +
                ", 112) AND :to" +
                param +
                " >= CONVERT(varchar, " +
                columnName1 +
                ", 112)) OR "
            );
            sqlBuilder.append(
                " (:from" +
                param +
                " <= CONVERT(varchar, " +
                columnName2 +
                ", 112) AND :to" +
                param +
                " >= CONVERT(varchar, " +
                columnName2 +
                ", 112))) "
            );
            params.put("from" + param, fromDate);
            params.put("to" + param, toDate);
        } else if (!Strings.isNullOrEmpty(fromDate)) {
            sqlBuilder.append(" AND (:from" + param + " <= CONVERT(varchar, " + columnName1 + ", 112) ");
            sqlBuilder.append(" OR :from" + param + " <= CONVERT(varchar, " + columnName2 + ", 112)) ");
            params.put("from" + param, fromDate);
        } else if (!Strings.isNullOrEmpty(toDate)) {
            sqlBuilder.append(" AND (:to" + param + " >= CONVERT(varchar, " + columnName1 + ", 112) ");
            sqlBuilder.append(" OR :to" + param + " >= CONVERT(varchar, " + columnName2 + ", 112)) ");
            params.put("to" + param, toDate);
        }
    }

    public static BigDecimal getBigDecimal(Object object) {
        return object != null ? (BigDecimal) object : null;
    }

    public static BigDecimal parseToBigDecimal(String object) {
        try {
            return new BigDecimal(object);
        } catch (NumberFormatException n) {
            return BigDecimal.ZERO;
        }
    }

    public static Integer parseToInteger(String object) {
        try {
            return new Integer(object);
        } catch (NumberFormatException n) {
            return 0;
        }
    }

    public static LocalDate getLocalDate(Object object) {
        return object != null ? ((Timestamp) object).toLocalDateTime().toLocalDate() : null;
    }

    public static LocalDate getRealLocalDate(String object) {
        if (!Strings.isNullOrEmpty(object)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            //convert String to LocalDate
            LocalDate localDate = LocalDate.parse(object);
            return localDate;
        }
        return null;
    }

    public static LocalDate parseStringToLocalDate(String object, String pattern) {
        if (!Strings.isNullOrEmpty(object)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
            //convert String to LocalDate
            LocalDate localDate = LocalDate.parse(object, formatter);
            return localDate;
        }
        return null;
    }

    public static LocalDateTime getRealLocalDateTime(String object) {
        if (!Strings.isNullOrEmpty(object)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            //convert String to LocalDate
            LocalDateTime localDate = LocalDateTime.parse(object);
            return localDate;
        }
        return null;
    }

    public static LocalDateTime getLocalDateTime(Object object) {
        return object != null ? ((Timestamp) object).toLocalDateTime() : null;
    }

    public static UUID getUUID(Object object) {
        return object != null ? UUID.fromString((String) object) : null;
    }

    public static String getDate(Object object) {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        return object != null ? dateFormat.format(object) : null;
    }

    public static Float getFloat(Object object) {
        return object != null ? ((BigDecimal) object).floatValue() : null;
    }

    public static Integer getInteger(Object object) {
        return object != null ? ((BigDecimal) object).intValue() : null;
    }

    public static Integer getRealInteger(Object object) {
        return object != null ? ((Integer) object).intValue() : null;
    }

    public static String getString(Object object) {
        return object != null ? (String) object : null;
    }

    public static Integer getInteger(String object) {
        try {
            if (!Strings.isNullOrEmpty(object)) {
                return Integer.parseInt(object);
            }
        } catch (Exception ignore) {}
        return null;
    }

    public static Long getLong(Object object) {
        return object != null ? ((Integer) object).longValue() : null;
    }

    public static Double getDouble(Object object) {
        return object != null ? ((BigDecimal) object).doubleValue() : null;
    }

    public static boolean getBoolean(Object object) {
        return object != null && ((BigDecimal) object).intValue() == 1;
    }

    public static boolean getRealBoolean(Object object) {
        return object != null ? ((Boolean) object) : false;
    }

    /**
     * @param dateStr
     * @return
     * @author kienpv
     * <p>
     * convert string to string format yyyy/mm/dd
     */
    public static String converDate(String dateStr) {
        try {
            DateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss Z");
            Date date = (Date) formatter.parse(dateStr);
            System.out.println(date);

            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            String formatedDate = cal.get(Calendar.YEAR) + "-" + (cal.get(Calendar.MONTH) + 1) + "-" + cal.get(Calendar.DATE);
            System.out.println("formatedDate : " + formatedDate);
            return formatedDate;
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return "";
        }
    }

    /**
     * @param dateStr
     * @return
     * @author kienpv
     * <p>
     * convert localdate to string format yyyymmdd
     */
    public static String convertDate(LocalDate dateStr) {
        try {
            //            DateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss Z");
            //            Date date = (Date) formatter.parse(dateStr);
            //            System.out.println(date);

            //            Calendar cal = Calendar.getInstance();
            //            cal.setTime(date);
            String formatedDate =
                dateStr.getYear() +
                "" +
                (dateStr.getMonthValue() < 10 ? "0" + dateStr.getMonthValue() : dateStr.getMonthValue()) +
                "" +
                (dateStr.getDayOfMonth() < 10 ? "0" + dateStr.getDayOfMonth() : dateStr.getDayOfMonth()) +
                "";
            //            System.out.println("formatedDate : " + formatedDate);
            return formatedDate;
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return "";
        }
    }

    public static String convertDateYMD(LocalDate dateStr) {
        try {
            //            DateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss Z");
            //            Date date = (Date) formatter.parse(dateStr);
            //            System.out.println(date);

            //            Calendar cal = Calendar.getInstance();
            //            cal.setTime(date);
            String formatedDate =
                dateStr.getYear() +
                "-" +
                (dateStr.getMonthValue() < 10 ? "0" + dateStr.getMonthValue() : dateStr.getMonthValue()) +
                "-" +
                (dateStr.getDayOfMonth() < 10 ? "0" + dateStr.getDayOfMonth() : dateStr.getDayOfMonth()) +
                "";
            //            System.out.println("formatedDate : " + formatedDate);
            return formatedDate;
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return "";
        }
    }

    public static String convertDate2(LocalDate dateStr) {
        try {
            //            DateFormat formatter = new SimpleDateFormat("dd/mm/yy");
            //            Date date = (Date) formatter.parse(dateStr);
            //            System.out.println(date);

            //            Calendar cal = Calendar.getInstance();
            //            cal.setTime(date);
            String formatedDate;
            if (dateStr == null) {
                formatedDate = "";
            } else {
                formatedDate =
                    (dateStr.getDayOfMonth() < 10 ? "0" + dateStr.getDayOfMonth() : dateStr.getDayOfMonth()) +
                    "" +
                    "/" +
                    (dateStr.getMonthValue() < 10 ? "0" + dateStr.getMonthValue() : dateStr.getMonthValue()) +
                    "/" +
                    dateStr.getYear();
            }
            //            System.out.println("formatedDate : " + formatedDate);
            return formatedDate;
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return "";
        }
    }

    public static String convertDateTime(LocalDateTime dateStr) {
        try {
            //            DateFormat formatter = new SimpleDateFormat("dd/mm/yy");
            //            Date date = (Date) formatter.parse(dateStr);
            //            System.out.println(date);

            //            Calendar cal = Calendar.getInstance();
            //            cal.setTime(date);
            String formatedDate;
            if (dateStr == null) {
                formatedDate = "";
            } else {
                formatedDate =
                    (dateStr.getDayOfMonth() < 10 ? "0" + dateStr.getDayOfMonth() : dateStr.getDayOfMonth()) +
                    "" +
                    "/" +
                    (dateStr.getMonthValue() < 10 ? "0" + dateStr.getMonthValue() : dateStr.getMonthValue()) +
                    "/" +
                    dateStr.getYear();
            }
            //            System.out.println("formatedDate : " + formatedDate);
            return formatedDate;
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return "";
        }
    }

    public static boolean isValidTaxCode(String mst) {
        if (mst.length() <= 14 && mst.length() >= 10) {
            Integer value =
                getInt(mst.charAt(0)) *
                31 +
                getInt(mst.charAt(1)) *
                29 +
                getInt(mst.charAt(2)) *
                23 +
                getInt(mst.charAt(3)) *
                19 +
                getInt(mst.charAt(4)) *
                17 +
                getInt(mst.charAt(5)) *
                13 +
                getInt(mst.charAt(6)) *
                7 +
                getInt(mst.charAt(7)) *
                5 +
                getInt(mst.charAt(8)) *
                3;
            int mod = 10 - value % 11;
            return Math.abs(mod) == getInt(mst.charAt(9));
        } else {
            return false;
        }
    }

    private static Integer getInt(char c) {
        return (int) c - 48;
    }

    public static String removeDotAndComma(String before) {
        if (Strings.isNullOrEmpty(before)) {
            return "";
        }
        return before.replace(".", "").replace(",", "");
    }

    public static UUID revertUUID(UUID id) {
        if (id == null) {
            return null;
        }
        String data = id.toString();
        String finalData =
            data.substring(6, 8) +
            data.substring(4, 6) +
            data.substring(2, 4) +
            data.substring(0, 2) +
            "-" +
            data.substring(11, 13) +
            data.substring(9, 11) +
            "-" +
            data.substring(16, 18) +
            data.substring(14, 16) +
            data.substring(18);
        return UUID.fromString(finalData);
    }

    /**
     * @param input
     * @return
     * @author anmt
     */
    public static String getMd5(String input) {
        try {
            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            // digest() method is called to calculate message digest
            //  of an input digest() return array of byte
            byte[] messageDigest = md.digest(input.getBytes());
            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);
            // Convert message digest into hex value
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) { // For specifying wrong message digest algorithms
            throw new RuntimeException(e);
        }
    }

    public static void setParam(PreparedStatement ps, int index, Integer value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.INTEGER);
        } else {
            ps.setInt(index, value);
        }
    }

    public static void setParam(PreparedStatement ps, int index, Long value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.LONGNVARCHAR);
        } else {
            ps.setLong(index, value);
        }
    }

    public static void setParam(PreparedStatement ps, int index, String value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.NVARCHAR);
        } else {
            ps.setString(index, value);
        }
    }

    public static void setParam(PreparedStatement ps, int index) throws SQLException {
        ps.setNull(index, Types.NVARCHAR);
    }

    public static void setParam(PreparedStatement ps, int index, LocalDate value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.NVARCHAR);
        } else {
            ps.setString(index, value.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            ps.setString(index, value.toString());
        }
    }

    public static void setParam(PreparedStatement ps, int index, LocalDateTime value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.NVARCHAR);
        } else {
            if (value.toString().length() != 19) {
                ps.setString(index, (value.toString()));
            } else {
                ps.setString(index, value.toString());
            }
        }
    }

    public static void setParamCustom(PreparedStatement ps, int index, LocalDateTime value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.NVARCHAR);
        } else {
            if (value.toString().length() != 19) {
                ps.setString(index, (value.toString() + ":00"));
            } else {
                ps.setString(index, value.toString());
            }
        }
    }

    public static void setParam(PreparedStatement ps, int index, BigDecimal value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.DECIMAL);
        } else {
            ps.setBigDecimal(index, value);
        }
    }

    public static void setParam(PreparedStatement ps, int index, Boolean value) throws SQLException {
        if (value == null) {
            ps.setBoolean(index, false);
            ps.setNull(index, Types.BOOLEAN);
        } else {
            ps.setBoolean(index, value);
        }
    }

    public static void setParam(PreparedStatement ps, int index, Date value) throws SQLException {
        if (value == null) {
            ps.setNull(index, Types.NVARCHAR);
        } else {
            ps.setDate(index, (java.sql.Date) value);
        }
    }

    public static List<String> getAllTableNameReferenceWithEmContract() {
        List<String> list = new ArrayList<>();
        list.add("OPAccount");
        list.add("OPMaterialGoods");
        list.add("MCReceiptDetail");
        list.add("MCPaymentDetail");
        list.add("MCPaymentDetailInsurance");
        list.add("MBTellerPaperDetail");
        list.add("MBTellerPaperDetailInsurance");
        list.add("MBCreditCardDetail");
        list.add("MBDepositDetail");
        list.add("MBInternalTransferDetail");
        list.add("PPInvoiceDetail");
        list.add("PPServiceDetail");
        list.add("PPDiscountReturnDetail");
        list.add("SAInvoiceDetail");
        list.add("SAReturnDetail");
        list.add("RSInwardOutwardDetail");
        list.add("RSProductionOrderDetail");
        list.add("TIIncrementDetail");
        list.add("FAIncrementDetail");
        list.add("FADecrementDetailPost");
        list.add("FAAdjustmentDetailPost");
        list.add("CPOPN");
        list.add("CPExpenseList");
        list.add("CPAllocationGeneralExpenseDetail");
        list.add("CPAcceptanceDetail");
        list.add("GOtherVoucherDetail");
        list.add("GeneralLedger");
        list.add("CPPeriodDetail");
        return list;
    }

    public static List<String> getAllTableNameReferenceWithEmContractDetail() {
        List<String> list = new ArrayList<>();
        list.add("PPInvoiceDetail");
        list.add("SAInvoiceDetail");
        return list;
    }

    public static List<String> getAllTableNameReferenceWithRsInwardOutward() {
        List<String> list = new ArrayList<>();
        list.add("PPInvoice");
        list.add("PPDiscountReturn");
        list.add("SAInvoiceDetail");
        list.add("SAReturn");
        return list;
    }

    public static Double getValueVATRate(Integer vATRate) {
        double newVATRate;
        if (vATRate == 1) {
            newVATRate = 5;
        } else if (vATRate == 2) {
            newVATRate = 10;
        } else if (vATRate == 5) {
            newVATRate = 5 * 0.7;
        } else if (vATRate == 6) {
            newVATRate = 10 * 0.7;
        } else {
            newVATRate = 0;
        }
        return newVATRate;
    }
}
